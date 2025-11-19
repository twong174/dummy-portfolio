import React, { useEffect, useRef } from "react";
import { Renderer, Vec2, Vec4, Geometry, Texture, Program, Mesh } from "ogl";

interface TextFlowmapProps {
  text?: string;
  className?: string;
}

const TextFlowmap: React.FC<TextFlowmapProps> = ({
  text = "404",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const imgElement = containerRef.current;
    const renderer = new Renderer({
      dpr: 1.5,
      alpha: true,
      premultipliedAlpha: false,
    });
    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);

    canvasRef.current = gl.canvas;
    imgElement.appendChild(gl.canvas);

    const mouse = new Vec2(0.5, 0.5);
    const targetMouse = new Vec2(0.5, 0.5);
    const prevMouse = new Vec2(0.5, 0.5);
    let easeFactor = 0.02;

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    // Create text canvas that matches the container size
    const createTextCanvas = () => {
      const containerRect = imgElement.getBoundingClientRect();
      const width = containerRect.width;
      const height = 400;

      const textCanvas = document.createElement("canvas");
      textCanvas.width = width * 2; // High DPI
      textCanvas.height = height * 2;

      const ctx = textCanvas.getContext("2d")!;
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);

      const fontSize = 600;
      ctx.font = `900 ${fontSize}px "Impact", "Arial Black", sans-serif`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);

      return { textCanvas, width, height };
    };

    let textData = createTextCanvas();
    const textTexture = new Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });
    textTexture.image = textData.textCanvas;

    const vertexShader = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragmentShader = `
      precision highp float;
      precision highp int;
      
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      
      varying vec2 vUv;
      uniform vec4 res;
      
      void main() { 
        vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/80.0, 1.0/80.0);
        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.6;
        vec2 uv = vUv - uvOffset;

        vec4 tex = texture2D(u_texture, uv);
        
        // Make background transparent
        if (tex.a < 0.1) discard;
        
        // Apply orange tint based on distortion strength
        vec3 color1 = vec3(1.0, 0.4, 0.0);
        vec3 color2 = vec3(1.0, 0.6, 0.2);
        vec3 color3 = vec3(0.8, 0.2, 0.0);
        
        vec3 orangeTint = mix(color1, color2, strength * 2.0);
        orangeTint = mix(orangeTint, color3, strength * 3.0);
        
        vec3 finalColor = tex.rgb + (orangeTint * strength * 0.8);
        
        gl_FragColor = vec4(finalColor, tex.a);
      }
    `;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_texture: { value: textTexture },
        u_mouse: { value: new Vec2(0.5, 0.5) },
        u_prevMouse: { value: new Vec2(0.5, 0.5) },
        res: {
          value: new Vec4(textData.width, textData.height, 1, 1),
        },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const rec = imgElement.getBoundingClientRect();
      const width = rec.width;
      const height = 500; // Fixed 500px height

      // Update canvas size
      gl.canvas.width = width * 2;
      gl.canvas.height = height * 2;
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;

      // Recreate text canvas with new dimensions
      textData = createTextCanvas();
      textTexture.image = textData.textCanvas;
      textTexture.needsUpdate = true;

      const imageAspect =
        textData.textCanvas.width / textData.textCanvas.height;
      const canvasAspect = width / height;
      let a1, a2;

      if (canvasAspect > imageAspect) {
        a1 = imageAspect / canvasAspect;
        a2 = 1.0;
      } else {
        a1 = 1.0;
        a2 = canvasAspect / imageAspect;
      }

      if (mesh) {
        mesh.program.uniforms.res.value = new Vec4(width, height, a1, a2);
      }
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", resize);

    // Initial setup
    resize();

    const updateMouse = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const rect = imgElement.getBoundingClientRect();
      let x: number, y: number;

      if ("changedTouches" in e && e.changedTouches.length) {
        x = e.changedTouches[0].pageX - rect.left;
        y = e.changedTouches[0].pageY - rect.top;
      } else {
        const mouseEvent = e as MouseEvent;
        x = mouseEvent.clientX - rect.left;
        y = mouseEvent.clientY - rect.top;
      }

      // Store previous mouse position
      prevMouse.copy(targetMouse);

      // Update target mouse position (normalized coordinates)
      targetMouse.set(x / rect.width, 1.0 - y / rect.height);

      // Increase ease factor for more responsive movement
      easeFactor = 0.04;
    };

    const handleMouseEnter = () => {
      easeFactor = 0.02;
    };

    const handleMouseLeave = () => {
      easeFactor = 0.02;
      targetMouse.copy(prevMouse);
    };

    if ("ontouchstart" in window) {
      imgElement.addEventListener("touchstart", updateMouse as any);
      imgElement.addEventListener("touchmove", updateMouse as any, {
        passive: false,
      });
    } else {
      imgElement.addEventListener("mousemove", updateMouse as any);
      imgElement.addEventListener("mouseenter", handleMouseEnter as any);
      imgElement.addEventListener("mouseleave", handleMouseLeave as any);
    }

    let animationFrameId: number;
    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);

      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * easeFactor;
      mouse.y += (targetMouse.y - mouse.y) * easeFactor;

      // Update shader uniforms
      program.uniforms.u_mouse.value.copy(mouse);
      program.uniforms.u_prevMouse.value.copy(prevMouse);

      renderer.render({ scene: mesh });
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);

      if ("ontouchstart" in window) {
        imgElement.removeEventListener("touchstart", updateMouse as any);
        imgElement.removeEventListener("touchmove", updateMouse as any);
      } else {
        imgElement.removeEventListener("mousemove", updateMouse as any);
        imgElement.removeEventListener("mouseenter", handleMouseEnter as any);
        imgElement.removeEventListener("mouseleave", handleMouseLeave as any);
      }

      if (canvasRef.current && imgElement.contains(canvasRef.current)) {
        imgElement.removeChild(canvasRef.current);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ touchAction: "none" }}
    />
  );
};

export default TextFlowmap;

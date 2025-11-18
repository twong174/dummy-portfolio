import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Vec2,
  Vec4,
  Geometry,
  Texture,
  Program,
  Mesh,
  Flowmap,
} from "ogl";

interface TextFlowmapProps {
  text?: string;
  className?: string;
}

const TextFlowmap: React.FC<TextFlowmapProps> = ({
  text = "SUPERSOLID",
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

    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    const lastMouse = new Vec2();
    let lastTime = performance.now();

    const flowmap = new Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5,
    });

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

      const fontSize = 600; // Adjust multiplier as needed
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
      
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      
      varying vec2 vUv;
      uniform vec4 res;
      
      void main () {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        
        float flowStrength = length(flow.xy);
        vec2 myUV = vUv - flow.xy * 0.3;
        
        vec4 tex = texture2D(tWater, myUV);
        
        if (tex.a < 0.1) discard;
        
        vec3 color1 = vec3(1.0, 0.4, 0.0);
        vec3 color2 = vec3(1.0, 0.6, 0.2);
        vec3 color3 = vec3(0.8, 0.2, 0.0);
        
        vec3 orangeTint = mix(color1, color2, flowStrength * 2.0);
        orangeTint = mix(orangeTint, color3, flowStrength * 3.0);
        
        vec3 finalColor = tex.rgb + (orangeTint * flowStrength * 0.8);
        
        gl_FragColor = vec4(finalColor, tex.a);
      }
    `;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: textTexture },
        tFlow: flowmap.uniform,
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

      mouse.set(x / rect.width, 1.0 - y / rect.height);

      const deltaX = x - lastMouse.x;
      const deltaY = y - lastMouse.y;
      lastMouse.set(x, y);

      const time = performance.now();
      const delta = Math.max(10.4, time - lastTime);
      lastTime = time;

      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      (velocity as any).needsUpdate = true;
    };

    if ("ontouchstart" in window) {
      imgElement.addEventListener("touchstart", updateMouse as any);
      imgElement.addEventListener("touchmove", updateMouse as any, {
        passive: false,
      });
    } else {
      imgElement.addEventListener("mousemove", updateMouse as any);
    }

    let animationFrameId: number;
    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);

      if (!(velocity as any).needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }
      (velocity as any).needsUpdate = false;

      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, (velocity as any).length ? 0.15 : 0.1);
      flowmap.update();

      program.uniforms.uTime.value = t * 0.01;
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

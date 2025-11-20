import { useEffect, useRef } from "react";
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

interface ImageLiquidDistortionProps {
  imageSrc: string;
  className?: string;
}

const ImageLiquidDistortion = ({ 
  imageSrc, 
  className = "" 
}: ImageLiquidDistortionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const imgElement = containerRef.current;
    const renderer = new Renderer({
      dpr: 2,
      alpha: true,
      premultipliedAlpha: false,
    });

    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);

    canvasRef.current = gl.canvas;
    imgElement.appendChild(gl.canvas);

    const mouse = new Vec2(-2);
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

    const image = new Image();
    image.crossOrigin = "anonymous";

    const imageTexture = new Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

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
      
      uniform sampler2D tImage;
      uniform sampler2D tFlow;
      uniform float uTime;
      
      varying vec2 vUv;
      uniform vec4 res;
      
      void main () {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        
        float flowStrength = length(flow.xy);
        vec2 myUV = vUv - flow.xy * 0.1;
        
        vec2 redOffset = flow.xy * 0.02;
        vec2 greenOffset = flow.xy * 0.01;
        vec2 blueOffset = flow.xy * 0.015;
  
        vec4 redChannel = texture2D(tImage, myUV + redOffset);
        vec4 greenChannel = texture2D(tImage, myUV + greenOffset);
        vec4 blueChannel = texture2D(tImage, myUV - blueOffset);
    
        vec3 finalColor = vec3(redChannel.r, greenChannel.g, blueChannel.b);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        tImage: { value: imageTexture },
        tFlow: flowmap.uniform,
        res: {
          value: new Vec4(1, 1, 1, 1),
        },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const rec = imgElement.getBoundingClientRect();
      const width = rec.width;
      const height = rec.height;

      gl.canvas.width = width * 2;
      gl.canvas.height = height * 2;
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;

      const imageAspect = image.width / image.height;
      const canvasAspect = width / height;
      let a1, a2;

      // object-cover behavior: fill container while maintaining aspect ratio
      if (canvasAspect > imageAspect) {
        a1 = 1.0;
        a2 = canvasAspect / imageAspect;
      } else {
        a1 = imageAspect / canvasAspect;
        a2 = 1.0;
      }

      if (mesh) {
        mesh.program.uniforms.res.value = new Vec4(width, height, a1, a2);
      }
      renderer.setSize(width, height);
    };

    image.onload = () => {
      imageTexture.image = image;
      resize();
    };

    image.src = imageSrc;

    window.addEventListener("resize", resize);

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
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ touchAction: "none" }}
    />
  );
};

export default ImageLiquidDistortion;
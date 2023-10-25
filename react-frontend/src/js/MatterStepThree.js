import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const MatterStepThree = () => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const width = 420;
    const height = 400;
    const m = Math.min(width, height);
    const rat = (1 / 4) * 2;
    const r = m * rat;
    const c = { x: width / 2, y: height / 2 };
    let flag = true;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Body = Matter.Body;
    const Common = Matter.Common;
    const Events = Matter.Events;
    const Composites = Matter.Composites;

    const engine = Engine.create();
    const render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false
      }
    });

    Render.run(render);

    const shapeSize = width / 30;
    const shapeAmount = 5;

    const stack = Composites.stack(
      width / 2 - shapeAmount * shapeSize,
      height / 2 - shapeAmount * shapeSize,
      shapeAmount,
      shapeAmount,
      0,
      0,
      (x, y) =>
        Bodies.circle(x, y, shapeSize, {
          restitution: 0.5,
          density: 0.02,
          render: {
            strokeStyle: 'white',
            lineWidth: 0,
            sprite: {
              texture: `/party-games/assets/images/${Math.floor(Common.random(1, 5))}.png`,
              xScale: 0.4,
              yScale: 0.4
            }
          }
        })
    );

    World.add(engine.world, stack);

    engine.world.gravity.x = 0;
    engine.world.gravity.y = 5;
    render.options.background = 'rgba(0,0,0,0)';

    const parts = [];
    const pegCount = 64;
    const TAU = Math.PI * 2;

    for (let i = 0; i < pegCount; i++) {
      const segment = TAU / pegCount;
      const angle2 = (i / pegCount) * TAU + segment / 2;
      const x2 = Math.cos(angle2);
      const y2 = Math.sin(angle2);
      const cx2 = x2 * r + width / 2;
      const cy2 = y2 * r + height / 2;
      const rect = addRect({
        x: cx2,
        y: cy2,
        w: (10 / 1000) * m,
        h: (400 / 1000) * m,
        options: {
          angle: angle2,
          isStatic: true,
          density: 1,
          render: {
            fillStyle: 'rgba(0,0,0,0)',
            strokeStyle: 'rgba(0,0,0,0)',
            lineWidth: 0
          }
        }
      });
      parts.push(rect);
    }

    function addBody(...bodies) {
      World.add(engine.world, ...bodies);
    }

    function addRect({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) {
      const body = Bodies.rectangle(x, y, w, h, options);
      addBody(body);
      return body;
    }

    const explosion = function (engine) {
      const bodies = Composite.allBodies(engine.world);

      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];

        if (!body.isStatic && body.position.y >= (width / 2 + r) * 0.92) {
          const forceMagnitude = 0.12 * body.mass;

          Body.applyForce(body, body.position, {
            x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude
          });
        }

        if (!body.isStatic && dist(body.position, c) > r) {
          Body.setPosition(body, c);
        }
      }
    };

    let timeScaleTarget = 1;
    let counter = 0;

    Events.on(engine, 'afterUpdate', function (event) {
      engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;
      counter += 1;

      if (counter >= 1) {
        if (timeScaleTarget < 1) {
          timeScaleTarget = 1;
        } else {
          timeScaleTarget = 0.05;
        }

        flag && explosion(engine);

        counter = 0;
      }
    });

    function dist(pos1, pos2) {
      return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    }

    Engine.run(engine);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      canvasRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        //border: '1px solid white',
        high: '100%',
        width: '100%',
        padding: '8px'
      }}
    >
      <div style={{ textAlign: 'center' }}>Checkout</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          rowGap: '16px',
          marginBottom: '32px'
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          width: '100%',
          marginTop: '37%'
        }}
      >
        <canvas ref={canvasRef} width="400" height="400" />
      </div>
    </div>
  );
};

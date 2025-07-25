"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const settings = {
      topText: `neon`,
      midText: `genesis`,
      botText: `evangelion`,
      epText: `EPISODE:12`,
      titleText: `Take care of yourself.`,
      titleStyle: `serif`,
      titleAlign: 'right',
      aspectRatio: `standard`
    };

    function config(settings: any) {
      document.querySelectorAll('input,select,textarea').
      forEach((el: any) => {
        settings[el.id] = el.value || el.textContent; 
      });
      
      if (settings.aspectRatio == `wide`) {
        settings.canvasWidth = 1280;
        settings.canvasHeight = 720;
        settings.leftMargin = 115;
        settings.rightBoundary = 1150;
      } else {
        settings.canvasWidth = 900;
        settings.canvasHeight = 675;
        settings.leftMargin = 75;
        settings.rightBoundary = 815;
      }
      
      settings.smHeadSize = settings.canvasHeight * 0.184;
      settings.lgHeadSize = settings.canvasHeight * 0.308;
      settings.epSize = settings.canvasHeight * 0.095;
      settings.titleSize = settings.canvasHeight * 0.095;
      settings.maxWidth = settings.rightBoundary - settings.leftMargin;
      
      return settings;
    }

    function draw(config: any) {
      let can = document.getElementById('canvas') as HTMLCanvasElement,
          ctx = can.getContext('2d')!;
      
      let topText = config.topText.toUpperCase(),
          midText = config.midText.toUpperCase(),
          botText = config.botText.toUpperCase(),
          epText = config.epText.toUpperCase(),
          titleText = config.titleText,
          titleStyle = config.titleStyle,
          titleAlign = config.titleAlign,
          leftMargin = config.leftMargin,
          rightBoundary = config.rightBoundary,
          smHeadSize = config.smHeadSize,
          lgHeadSize = config.lgHeadSize,
          epSize = config.epSize,
          titleSize = config.titleSize,
          topSquash = 0.62,
          midSquash = 0.62,
          botSquash = 0.57,
          epSquash = 0.76,
          titleSquash = 0.76;
      
      let addText = addFittedText.bind(null, ctx, config);

      can.width = config.canvasWidth;
      can.height = config.canvasHeight;
      ctx.clearRect(0, 0, can.width, can.height);

      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#FFFFFF";
      ctx.textBaseline = "top";
      ctx.font = `900 ${smHeadSize}px Times New Roman`;
      addText(topText, 50, topSquash);
      addText(midText, 150, midSquash);
      ctx.font = `900 ${lgHeadSize}px Times New Roman`;
      addText(botText, 239, botSquash);

      ctx.font = `700 ${epSize}px Helvetica Neue,Helvetica,sans-serif`;
      addText(epText, 430, epSquash);
      
      titleStyle = titleStyles[titleStyle];
      ctx.font = `${titleStyle.weight} ${titleSize}px ${titleStyle.family}`;
      addText(titleText, 530, titleStyle.squash, titleAlign); 
    }

    const titleStyles: any = {
      sans: {
        weight: 800,
        family: `Helvetica Neue,Helvetica,sans-serif`,
        squash: 0.8
      },
      serif: {
        weight: 600,
        family: `Times New Roman,serif`,
        squash: 0.76
      }
    }

    function addFittedText(ctx: CanvasRenderingContext2D, config: any, text: string, y: number, squash: number = 1, align: string = 'left', maxWidth: number = 740) {
      let x; 
      
      if (align == "right") {
        ctx.textAlign = "right";
        x = config.rightBoundary;
      }
      else if (align == "left") {
        ctx.textAlign = "left";
        x = config.leftMargin
      }
      else if (align == "center") {
        ctx.textAlign = "center";
        x = (config.rightBoundary+config.leftMargin) / 2;
      }
      else {x = parseInt(align)}
      
      let toDraw = text.split('\n');
      if (toDraw.length > 1) {
        ctx.textBaseline = "middle";
      }
      for (let n in toDraw) {
        let mWidth = ctx.measureText('M').width;
        let widthCalc = ctx.measureText(toDraw[n]).width;
        if (widthCalc * squash >= maxWidth) {
          widthCalc = maxWidth;
        } else {
          widthCalc = widthCalc * squash;
        }
        ctx.fillText(toDraw[n], x, y+(parseInt(n)*mWidth), widthCalc);
      }

      ctx.textBaseline = "top";
      ctx.textAlign = "left";
    }

    (window as any).config = config;
    (window as any).draw = draw;
    (window as any).settings = settings;

    draw(config(settings));
  }, []);

  return (
    <>
      <style jsx>{`
        body {
          font-family: Helvetica Neue, Helvetica, sans-serif;
          color: white;
          background-color: #111111;
        }

        input, textarea, select, button {
          font-weight: bold;
          color:white;
          background-color: black;
        }

        #input-container {
          padding-top: 1em;
          color: black;
          background-color: red;
          display: block;
          width: 900px;
          height: 7.5em;
        }

        #main-fields {
          display: inline-block;
          float: left;
          clear: all;
          padding-right:3em;
        }

        #title-fields {
          clear:all;
          float:left;
        }

        label {
          font-weight: bold;
          display: inline-block;
          width: 7em;
          vertical-align: top;
          padding-bottom:0.3em;
        }

        textarea {
          display: inline-block;
          width: 22em;
        }

        #generate {
          padding: 1em 2em;
          margin: 5em 1em 1em 1em;
          color: white;
          display:block;
          float:right;
        }
      `}</style>
      <div 
        className="font-sans flex items-start justify-center min-h-screen bg-no-repeat pt-[20vh]"
        style={{ 
          backgroundImage: 'url(/bg.jpg)', 
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center'
        }}
      >
        <canvas id="canvas" width="900" height="675" style={{ width: '100%', height: 'auto' }}></canvas>
      </div>
    </>
  );
}
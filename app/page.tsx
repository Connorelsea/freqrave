'use client'

import styles from "./page.module.css";

import { Cute_Font } from 'next/font/google'

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const cuteFont = Cute_Font({
  weight: '400',
  subsets: ['latin'],
})

const colorSets = [
  {
    background: "#101010",
    particles: [
      "#8ace00",
      "#000000"
    ]
  },
  {
    background: "#10005f",
    particles: [
      "#2445ff",
      "#005b7b"
    ]
  },
  {
    background: "#ff0000",
    particles: [
      "#2445ff",
      "#005b7b"
    ]
  }
]



const App = () => {
  const [init, setInit] = useState(false);
const [colorSet, setColorSet] = useState(colorSets[0]);
const [container, setContainer] = useState<Container>();


  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // setContainer(container);
  };

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const changeColorSet = useCallback(() => {
    console.log("change color set");
    setColorSet(colorSets[getRandomInt(0, colorSets.length - 1)]);
  }, []);

  const options: ISourceOptions = useMemo(
    () => {
      
      
      return (
      {
        "fullScreen": {
          "zIndex": 1
        },
        "background": {
          "color": {
            "value": colorSet.background,
          }
        },
        "particles": {
          "color": {
            "value": colorSet.particles,
          },
          "move": {
            "direction": "bottom",
            "enable": true,
            "outModes": {
              "default": "out"
            },
            "size": true,
            "speed": {
              "min": 1,
              "max": 3
            }
          },
          "number": {
            "value": 250,
            "density": {
              "enable": true,
              "area": 800
            }
          },
          "opacity": {
            "value": 1,
            "animation": {
              "enable": false,
              "startValue": "max",
              "destroy": "min",
              "speed": 0.3,
              "sync": true
            }
          },
          "rotate": {
            "value": {
              "min": 0,
              "max": 360
            },
            "direction": "random",
            "move": true,
            "animation": {
              "enable": true,
              "speed": 10
            }
          },
          "tilt": {
            "direction": "random",
            "enable": true,
            "move": true,
            "value": {
              "min": 0,
              "max": 360
            },
            "animation": {
              "enable": true,
              "speed": 60
            }
          },
          "shape": {
            "type": [
              "circle",
              "square",
              "image"
            ],
            "options": {
              "image": [
                {
                  "src": "https://utfs.io/f/5a5484d9-d20f-40bc-90e5-e872488c28f5-o1lyec.png",
                  "width": 200,
                  "height": 200,
                  "particles": {
                    "size": {
                      "value": 30
                    }
                  }
                },
                {
                  "src": "https://utfs.io/f/5a5484d9-d20f-40bc-90e5-e872488c28f5-o1lyec.png",
                  "width": 200,
                  "height": 200,
                  "particles": {
                    "size": {
                      "value": 16
                    }
                  }
                },
                {
                  "src": "https://utfs.io/f/0a79c43e-02ed-402e-8ec7-7c6816f47280-33zj83.png",
                  "width": 500,
                  "height": 500,
                  "particles": {
                    "size": {
                      "value": 80
                    }
                  }
                }
              ]
            }
          },
          "size": {
            "value": {
              "min": 1,
              "max": 5
            }
          },
          "roll": {
            "darken": {
              "enable": true,
              "value": 30
            },
            "enlighten": {
              "enable": true,
              "value": 30
            },
            "enable": true,
            "speed": {
              "min": 15,
              "max": 25
            }
          },
          "wobble": {
            "distance": 30,
            "enable": true,
            "move": true,
            "speed": {
              "min": -15,
              "max": 15
            }
          }
      },
      detectRetina: true,
    })},
    [],
  );

  if (init) {
    return (
      <div onClick={() => changeColorSet()} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1000 }}>
      <div className={styles.upcomingShowArea}>
        <span className={cuteFont.className}>upcoming shows</span>
        <span className={cuteFont.className}>8/24 - nola - pajama rave</span>
        <span className={cuteFont.className}>9/7 - br - mid city ballroom</span>
        <span className={cuteFont.className}>10/4 - br - mid city ballroom</span>

      </div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      </div>
    );
  }

  return <></>;
};

export default App;
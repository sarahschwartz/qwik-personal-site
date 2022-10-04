import { component$, useStyles$, useStore } from "@builder.io/qwik";
import styles from "./code.css?inline";

export default component$(() => {
  useStyles$(styles);
  const state = useStore({
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0,
    currentIndex: 0,
  });

  const code = [
    {
      title: "Homebase",
      description: "Homebase a platform for creators to build deeper relationships with their loyal fans. This project won the 1st place sponsor prize from Unlock Protocol for the ETH Global Online 2022 Hackathon.",
      tags: ["Lens Protocol", "Unlock Protocol", "The Graph", "GraphQL", "IPFS", "Next.js", "Firebase", "Ethers.js", "Rainbowkit"],
      liveUrl: "https://eth-global-hackathon-five.vercel.app/",
      sourceCode: "https://github.com/sarahschwartz/eth-global-hackathon"
    },
    {
      title: "30DaysofWeb3",
      description: "30DaysofWeb3 is a project-based curriculum available in both English and Spanish to teach developers how to build full-stack dapps. So far more than 2,000 developers have registered.",
      tags: ["Next.js", "Markdown", "i18n"],
      liveUrl: "https://www.30daysofweb3.xyz/",
      sourceCode: "https://github.com/womenbuildweb3/30daysofweb3.xyz"
    },
    {
      title: "Web3RSVP",
      description: "Web3RSVP is a full-stack dapp created for WBW3’s 30DaysofWeb3 curriculum. Users can create events, and attendees can rsvp with a refundable deposit. It includes a Solidity smart contract, a subgraph on The Graph, and a Next.js frontend.",
      tags: ["Solidity", "Hardhat", "Polygon", "The Graph", "GraphQL", "AssemblyScript", "IPFS", "Next.js", "Ethers.js", "Rainbowkit"],
      liveUrl: null,
      sourceCode: "https://github.com/womenbuildweb3/Web3RSVP-frontend"
    },
    {
      title: "Graphiqly",
      description: "A subgraph for influential wallets specific to an NFT category created for The Graph Hack 2022.",
      tags: ["The Graph", "Open Zeppelin Subgraphs", "GraphQL", "AssemblyScript"],
      liveUrl: "https://devpost.com/software/graphytime",
      sourceCode: "https://github.com/sarahschwartz/graph-hack-2022-mva/tree/main"
    },
    {
      title: "Treehouse NFT",
      description: "An NFT project completed for Web3Con 2022. Each NFT is a video of a treehouse made with Three.js.",
      tags: ["Three.js", "React Three Fiber"],
      liveUrl: null,
      sourceCode: "https://github.com/sarahschwartz/threejs-treehouses"
    },
    {
      title: "LooksRare Exchange Subgraph",
      description: "A subgraph for the LooksRare Exchange contract.",
      tags: ["The Graph", "GraphQL", "AssemblyScript"],
      liveUrl: null,
      sourceCode: "https://github.com/sarahschwartz/looksrare-exchange"
    },
    {
      title: "Generative SVG NFTs",
      description: "A smart contract that generates pumpkin SVG NFTs inspired by Yayoi Kusama",
      tags: ["Solidity", "Hardhat", "SVGs", "NFTs"],
      liveUrl: null,
      sourceCode: "https://github.com/sarahschwartz/svg-pumpkin-nft-contract"
    },
    {
      title: "AR Editor",
      description: "A web-based mobile editor to create augmented reality scenes with Three.js.",
      tags: ["Three.js", "AR", "WebXR"],
      liveUrl: null,
      sourceCode: "https://github.com/sarahschwartz/ar-editor-webxr-viewer"
    },
  ]

  return (
    <div id="code">
      <h2>Code</h2>
      <div
        class={state.isDragging ? "slider-container grabbing" : "slider-container"}
        style={ `transform: translateX(${state.currentTranslate * 1.0045}px);` }
      >
        {code.map((slide, index) => (
          <div
            onMouseMove$={(event) => {
              if (state.isDragging) {
                const currentPosition = event.pageX
                state.currentTranslate = state.prevTranslate + currentPosition - state.startPos
              }
            }}
            onMouseUp$={() => {
              state.isDragging = false;
              cancelAnimationFrame(state.animationID);
              const movedBy = state.currentTranslate - state.prevTranslate;

              if (movedBy < -100 && state.currentIndex < code.length - 1) {
                state.currentIndex++;
              }

              if (movedBy > 100 && state.currentIndex > 0) {
                state.currentIndex--;
              }
              state.currentTranslate = state.currentIndex * -window.innerWidth;
              state.prevTranslate = state.currentTranslate;
            }}
            onMouseLeave$={() => {
              state.isDragging = false;
              cancelAnimationFrame(state.animationID);
              const movedBy = state.currentTranslate - state.prevTranslate;

              if (movedBy < -100 && state.currentIndex < code.length - 1) {
                state.currentIndex++;
              }

              if (movedBy > 100 && state.currentIndex > 0) {
                state.currentIndex--;
              }
              state.currentTranslate = state.currentIndex * -window.innerWidth;
              state.prevTranslate = state.currentTranslate;
            }}
            onMouseDown$={(event) => {
              function animation() {
                if (state.isDragging) {
                  requestAnimationFrame(animation);
                }
              }
              state.currentIndex = index;
              state.startPos = event.pageX
              state.isDragging = true;
              state.animationID = requestAnimationFrame(animation);
            }}
            onTouchMove$={(event) => {
              if (state.isDragging) {
                const currentPosition = event.touches[0].clientX
                state.currentTranslate = state.prevTranslate + currentPosition - state.startPos
              }
            }}
            onTouchEnd$={() => {
              state.isDragging = false;
              cancelAnimationFrame(state.animationID);
              const movedBy = state.currentTranslate - state.prevTranslate;

              if (movedBy < -100 && state.currentIndex < code.length - 1) {
                state.currentIndex++;
              }

              if (movedBy > 100 && state.currentIndex > 0) {
                state.currentIndex--;
              }
              state.currentTranslate = state.currentIndex * -window.innerWidth;
              state.prevTranslate = state.currentTranslate;
            }}
            onTouchStart$={(event) => {
              function animation() {
                if (state.isDragging) {
                  requestAnimationFrame(animation);
                }
              }
              state.currentIndex = index;
              state.startPos = event.touches[0].clientX;
              state.isDragging = true;
              state.animationID = requestAnimationFrame(animation);
            }}
            class="slide"
          >
            <div class="inner-slide">
              <a href={slide.liveUrl ? slide.liveUrl : slide.sourceCode} target="_blank">
                <h3>{slide.title}</h3>
              </a>
              <p class="code-description">{slide.description}</p>

              <ul class="tags-container">
                {slide.tags.map((tag) => (
                  <li class="tag code-tag">{tag}</li>
                ))}
              </ul>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
});

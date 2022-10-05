import {
  component$,
  useStyles$,
  useStore,
} from "@builder.io/qwik";
import styles from "./blog.css?inline";

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

  const blogs = [
    {
      title: "Upload Files to IPFS with Next.js and Web3.Storage",
      slug: "upload-files-to-ipfs-with-nextjs-and-web3storage",
      brief: "What is IPFS?\nIPFS stands for InterPlanetary File System. It's a decentralized peer-to-peer file storage network that anyone can use to store files and data. IPFS was developed by Protocol Labs.\nWhat is Web3.Storage?\nWeb3.Storage is a service that pr...",
      coverImage: "https://cdn.hashnode.com/res/hashnode/image/upload/v1661813174861/J_Mw9klLm.png"
    },
    {
      brief: "More to come..."
    }
  ]


  return (
    <div id="blog">
      <h2>Blog</h2>
      <div
        class={
          state.isDragging ? "slider-container grabbing" : "slider-container"
        }
        style={`transform: translateX(${state.currentTranslate * 1.0045}px);`}
      >
              {blogs.map(
                (post, index: number) => (
                  <div
                    onMouseMove$={(event) => {
                      if (state.isDragging) {
                        const currentPosition = event.pageX;
                        state.currentTranslate =
                          state.prevTranslate +
                          currentPosition -
                          state.startPos;
                      }
                    }}
                    onMouseUp$={() => {
                      state.isDragging = false;
                      cancelAnimationFrame(state.animationID);
                      const movedBy =
                        state.currentTranslate - state.prevTranslate;

                      if (
                        movedBy < -100 &&
                        state.currentIndex <
                          blogs.length - 1
                      ) {
                        state.currentIndex++;
                      }

                      if (movedBy > 100 && state.currentIndex > 0) {
                        state.currentIndex--;
                      }
                      state.currentTranslate =
                        state.currentIndex * -window.innerWidth;
                      state.prevTranslate = state.currentTranslate;
                    }}
                    onMouseLeave$={() => {
                      state.isDragging = false;
                      cancelAnimationFrame(state.animationID);
                      const movedBy =
                        state.currentTranslate - state.prevTranslate;

                      if (
                        movedBy < -100 &&
                        state.currentIndex <
                          blogs.length - 1
                      ) {
                        state.currentIndex++;
                      }

                      if (movedBy > 100 && state.currentIndex > 0) {
                        state.currentIndex--;
                      }
                      state.currentTranslate =
                        state.currentIndex * -window.innerWidth;
                      state.prevTranslate = state.currentTranslate;
                    }}
                    onMouseDown$={(event) => {
                      function animation() {
                        if (state.isDragging) {
                          requestAnimationFrame(animation);
                        }
                      }
                      state.currentIndex = index;
                      state.startPos = event.pageX;
                      state.isDragging = true;
                      state.animationID = requestAnimationFrame(animation);
                    }}
                    onTouchMove$={(event) => {
                      if (state.isDragging) {
                        const currentPosition = event.touches[0].clientX;
                        state.currentTranslate =
                          state.prevTranslate +
                          currentPosition -
                          state.startPos;
                      }
                    }}
                    onTouchEnd$={() => {
                      state.isDragging = false;
                      cancelAnimationFrame(state.animationID);
                      const movedBy =
                        state.currentTranslate - state.prevTranslate;

                      if (
                        movedBy < -100 &&
                        state.currentIndex <
                          blogs.length - 1
                      ) {
                        state.currentIndex++;
                      }

                      if (movedBy > 100 && state.currentIndex > 0) {
                        state.currentIndex--;
                      }
                      state.currentTranslate =
                        state.currentIndex * -window.innerWidth;
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
                    <div class="inner-slide blog-slide">
                      {post.slug && 
                        <a href={`https://schwartz.hashnode.dev/${post.slug}`} target="_blank">
                        <h3>{post.title}</h3>
                        <img class="blog-card-image" src={post.coverImage} alt={post.title} />
                        </a>
                      }
                      <p class="code-description">{post.brief}</p>
                    </div>
                  </div>
                )
              )}
        
      
      </div>
    </div>
  );
});
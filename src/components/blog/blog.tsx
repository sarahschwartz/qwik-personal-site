import {
  component$,
  Resource,
  useResource$,
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

  const resource = useResource$(async () => {
    // ctx.track(store, 'bar'); // the resource will rerun when store.bar changes.
    // ctx.track(props, 'url'); // track() can be called multiple times, to track multiple values
    // ctx.cleanup(() => {
    //   // In case the resource need to be cleaned up, this function will be called.
    //   // Allowing to clean resources like timers, subscriptions, fetch requests, etc.
    // });

    // // cleanup() can also be called multiple times.
    // ctx.cleanup(() => console.log('cleanup'));

    // Resources can contain async computations
    const value = await onGet();
    return value;
  });

  return (
    <div id="blog">
      <h2>Blog</h2>
      <div
        class={
          state.isDragging ? "slider-container grabbing" : "slider-container"
        }
        style={`transform: translateX(${state.currentTranslate * 1.0045}px);`}
      >
        <Resource
          value={resource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Failed to load weather</div>}
          onResolved={(blogs) => (
            <>
              {blogs.data.user.publication.posts.map(
                (post: Post, index: number) => (
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
                          blogs.data.user.publication.posts.length - 1
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
                          blogs.data.user.publication.posts.length - 1
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
                          blogs.data.user.publication.posts.length - 1
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
                    <div class="inner-slide">
                      <a href={`https://schwartz.hashnode.dev/${post.slug}`} target="_blank">
                      <h3>{post.title}</h3>
                      <img class="blog-card-image" src={post.coverImage} alt={post.title} />
                      </a>
                      <p class="code-description">{post.brief}</p>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        />
      </div>
    </div>
  );
});

export const onGet = async () => {
  let responseJSON;
  try {
    const response = await fetch("https://api.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query myPosts {
          user(username: "sarahschwartz") {
            photo
            blogHandle
            publication {
              posts(page: 0) {
                title
                brief
                coverImage
                slug
                totalReactions
                dateAdded
              }
            }
          }
        }
          `,
      }),
    });
    if (response.status !== 200) {
      console.log("Oops! Something went wrong.");
    } else {
      responseJSON = await response.json();
    }
    // check response, if success is false, dont take them to success page
  } catch (error) {
    console.log("ERROR", error);
  }

  return responseJSON;
};

// export interface EndpointDataItem {
//   photo: string;
//   blogHandle: string;
//   publication: Publications
// }

// export interface Publications {
//   posts: Post[]
// }

export interface Post {
  title: string;
  brief: string;
  coverImage: string;
  slug: string;
  totalReactions: number;
  dateAdded: Date;
}

// type EndpointData = {
//   data: {
//     user: EndpointDataItem
//   }
// }

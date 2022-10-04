import { component$, Resource, useResource$ } from '@builder.io/qwik';
// import { response } from 'express';

export default component$(() => {

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
    const value = await onGet()
    return value;
  });



  
  return (
    <div>
      <Resource
        value={resource}
        onResolved={(blogs) => (
          <>
       
            {blogs.data.user.publication.posts.map((post: Post) => (
              <div>
                <h2>{post.title}</h2>
                <p>{post.brief}</p>
                
              </div>
            ))}
          </>
        )}
      />
    </div>
  );
});

// export const onGet: RequestHandler<EndpointData> = async () => {
//   let responseJSON;
//   try {
//     const response = await fetch('https://api.hashnode.com/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: `
//         query myPosts {
//           user(username: "sarahschwartz") {
//             photo
//             blogHandle
//             publication {
//               posts(page: 0) {
//                 title
//                 brief
//                 coverImage
//                 slug
//                 totalReactions
//                 dateAdded
//               }
//             }
//           }
//         }
//           `
//       }),
//     })
//     if (response.status !== 200) {
//       console.log("Oops! Something went wrong.");
//     } else {
//       responseJSON = await response.json();
//       console.log("RESP", responseJSON)
//     }
//     // check response, if success is false, dont take them to success page
//   } catch (error) {
//     console.log("ERROR", error)
//   }

//   return responseJSON
// };
export const onGet = async () => {
  let responseJSON;
  try {
    const response = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          `
      }),
    })
    if (response.status !== 200) {
      console.log("Oops! Something went wrong.");
    } else {
      responseJSON = await response.json();
      console.log("RESP", responseJSON)
    }
    // check response, if success is false, dont take them to success page
  } catch (error) {
    console.log("ERROR", error)
  }

  return responseJSON
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

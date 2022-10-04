import { component$, Resource } from '@builder.io/qwik';
import { useEndpoint, RequestHandler } from '@builder.io/qwik-city';
// import { response } from 'express';

export default component$(() => {
  const resource = useEndpoint<typeof onGet>();
  
  return (
    <div>
      <Resource
        value={resource}
        onResolved={(blogs) => (
          <>
       
            {blogs.data.user.publication.posts.map((post) => (
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

export const onGet: RequestHandler<EndpointData> = async () => {
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

export interface EndpointDataItem {
  photo: string;
  blogHandle: string;
  publication: Publications
}

export interface Publications {
  posts: Post[]
}

export interface Post {
  title: string;
  brief: string;
  coverImage: string;
  slug: string;
  totalReactions: number;
  dateAdded: Date;
}


type EndpointData = {
  data: {
    user: EndpointDataItem
  }
}

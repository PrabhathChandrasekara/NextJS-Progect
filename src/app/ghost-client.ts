import GhostContentAPI, { PostOrPage, GhostAPI, GhostError, BrowseFunction, PostsOrPages  } from "@tryghost/content-api";

// Create API instance with site credentialE

export const api: GhostAPI = new GhostContentAPI({
  url: "https://ceylonlanka.lk" as string,
  key: "9df86a48a926463c6ffd6f425c" as string,
  makeRequest: ({ url, method, params, headers }) => {
    const apiUrl = new URL(url);
    Object.keys(params).map((key) =>
        apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
    );

    return fetch(apiUrl.toString(), { method, headers })
        .then(async (res) => {
            if (!res.ok) {
              
            }
            return { data: await res.json() };
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
},

  version: "v5.0"
});


// Posts (Home page )

export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10
    })
    .catch((error: GhostError) => {
      throw error
    });
}

// Pagination
export async function getPaginationPosts(page: number) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 10,
      page: page
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Read (Reading page)

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch((error: Error) => {
      console.log(error)
    });
}


// Pages (Page)
export async function getAllPages() {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getSinglePage(pageSlug: string) {
  return await api.pages
    .read({
      slug: pageSlug
    }, { include: ["tags"] })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Author (Author page)

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors.read({
    slug: authorSlug
  }, { include: ["count.posts"] })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getSingleAuthorPosts(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch((error: Error) => {
      console.log(error)
    });
};

export async function getAllAuthors() {

  return await api.authors
    .browse({
      limit: "all"
    })
    .catch((error: Error) => {
      console.log(error)
    });
}

// tag (Tag page)

export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch((error: Error) => {
      console.log(error)
    });

}

export async function getSingleTag(tagSlug: string) {

  return await api.tags.read({ slug: tagSlug })
    .catch((error: Error) => {
      console.log(error)
    });
}

export async function getAllTags() {
  return await api.tags.browse({
    limit: "all"
  })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Search 
export async function getSearchPosts() {
  return await api.posts.browse({ include: ["tags", "authors"], limit: "all" })
    .catch((error: Error) => {
      console.log(error)
    });
}

// Navigation
export async function getNavigation() {
  return await api.settings.browse()
    .catch((error: Error) => {
      console.log(error)
    });

}
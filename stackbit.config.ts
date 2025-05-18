// stackbit.config.ts
import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";

export default defineStackbitConfig({
  // ...
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          // Static URL path derived from the "slug" field
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        },
        // ...
      ],
    })
  ],
  siteMap: ({ documents, models }) => {
    // 1. Filter all page models
    const pageModels = models.filter((m) => m.type === "page")

    return documents
      // 2. Filter all documents which are of a page model
      .filter((d) => pageModels.some(m => m.name === d.modelName))
      // 3. Map each document to a SiteMapEntry
      .map((document) => {
        // Map the model name to its corresponding URL
        const urlModel = (() => {
            switch (document.modelName) {
                case 'Page':
                    return 'otherPage';
                case 'Blog':
                    return 'otherBlog';
                default:
                    return null;
            }
        })();

        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${document.id}`,
          document,
          isHomePage: false,
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
});

// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // ...
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          // Define the model as a page model
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        }
      ],
    })
  ]
});
// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // ...
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          // Define the model as a page model
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        }
      ],
    })
  ]
});

import { defineStackbitConfig, DocumentStringLikeFieldNonLocalized, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { allModels } from 'sources/local/models';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content'],
    models: Object.values(allModels),
    assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

export const config = defineStackbitConfig({
    stackbitVersion: '~0.7.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    styleObjectModelName: 'ThemeStyle',
    contentSources: [gitContentSource],
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    },
    siteMap: ({ documents, models }): SiteMapEntry[] => {
        const pageModels = models.filter((model) => model.type === 'page').map((model) => model.name);
        return documents
            .filter((document) => pageModels.includes(document.modelName))
            .map((document) => {
                let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
                if (!slug) return null;
                /* Remove the leading slash in order to generate correct urlPath
                regardless of whether the slug is '/', 'slug' or '/slug' */
                slug = slug.replace(/^\/+/, '');
                switch (document.modelName) {
                    case 'PostFeedLayout':
                        return {
                            urlPath: '/blog',
                            document: document
                        };
                    case 'PostLayout':
                        return {
                            urlPath: `/blog/${slug}`,
                            document: document
                        };
                    default:
                        return {
                            urlPath: `/${slug}`,
                            document: document
                        };
                }
            });
    }
});

export default config;

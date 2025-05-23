import { defineStackbitConfig, DocumentStringLikeFieldNonLocalized, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
// If you have allModels in 'sources/local/models', otherwise define models inline below
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

export default defineStackbitConfig({
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
        // Find all model names that are of type "page"
        const pageModels = models.filter((model) => model.type === 'page').map((model) => model.name);
        return documents
            .filter((document) => pageModels.includes(document.modelName))
            .map((document) => {
                let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
                if (!slug) return null;

                // Normalize slug (remove leading slashes)
                slug = slug.replace(/^\/+/, '');

                // Example: customize URL mapping for different models
                switch (document.modelName) {
                    case 'PostFeedLayout':
                        return {
                            urlPath: '/blog',
                            document: document,
                            isHomePage: false,
                            stableId: document.id,
                        };
                    case 'PostLayout':
                        return {
                            urlPath: `/blog/${slug}`,
                            document: document,
                            isHomePage: false,
                            stableId: document.id,
                        };
                    default:
                        // Home page special-case (slug is empty or '/')
                        const isHome = slug === '' || slug === '/';
                        return {
                            urlPath: isHome ? '/' : `/${slug}`,
                            document: document,
                            isHomePage: isHome,
                            stableId: document.id,
                        };
                }
            })
            .filter(Boolean) as SiteMapEntry[];
    }
});

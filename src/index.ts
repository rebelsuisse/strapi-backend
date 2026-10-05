import type { Core } from '@strapi/strapi';

// Document Service actions that read entries, i.e. the ones `?status=` steers.
const READ_ACTIONS = new Set(['findMany', 'findFirst', 'findOne', 'count']);

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Keep drafts private (security review L-3b). On the public REST API,
    // Strapi honours `?status=draft` for anyone allowed to read a collection,
    // so an anonymous visitor could read unpublished entries. Every read made
    // for a REST request is therefore forced to published versions, unless
    // the request carries an API token (the translator uses one). The admin
    // panel runs on its own routes and is not affected.
    strapi.documents.use(async (context, next) => {
      const ctx = strapi.requestContext.get();
      if (
        ctx?.state?.route?.info?.type === 'content-api' &&
        ctx.state.auth?.strategy?.name !== 'content-api-token' &&
        context.contentType?.options?.draftAndPublish &&
        READ_ACTIONS.has(context.action)
      ) {
        context.params = { ...context.params, status: 'published' };
      }
      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

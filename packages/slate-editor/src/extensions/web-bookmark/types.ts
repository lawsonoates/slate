import type { OEmbedInfo } from '@prezly/sdk';
import type { BOOKMARK_NODE_TYPE } from '@prezly/slate-types';

import type { EmbedNode } from '#extensions/embed';

export interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BOOKMARK_NODE_TYPE}`;

import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout, IMAGE_NODE_TYPE } from '@prezly/slate-types';
import type { UploadcareImageStoragePayload } from '@prezly/uploadcare';

const createImage = (
    file: UploadcareImageStoragePayload,
    {
        children = [{ text: '' }],
        href = '',
        layout = ImageLayout.CONTAINED,
        width = '100%',
        width_factor = '100%',
    }: Partial<Omit<ImageNode, 'file' | 'type'>>,
): ImageNode => ({
    type: IMAGE_NODE_TYPE,
    children,
    file,
    href,
    layout,
    width_factor,
    width,
});

export default createImage;

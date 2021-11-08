import { UploadcareImageStoragePayload } from '../sdk';

import { ElementNode, isElementNode } from './ElementNode';

export const GALLERY_NODE_TYPE = 'gallery';

export enum GalleryLayout {
    CONTAINED = 'contained',
    EXPANDED = 'expanded',
    FULL_WIDTH = 'full-width',
}

export enum GalleryImageSize {
    L = 'L',
    M = 'M',
    S = 'S',
    XL = 'XL',
    XS = 'XS',
}

export enum GalleryPadding {
    L = 'L',
    M = 'M',
    S = 'S',
}

export interface GalleryNode extends ElementNode {
    type: typeof GALLERY_NODE_TYPE;
    images: {
        /** empty string if no caption */
        caption: string;
        file: UploadcareImageStoragePayload;
    }[];
    layout: GalleryLayout;
    padding: GalleryPadding;
    thumbnail_size: GalleryImageSize;
    uuid: string;
}

export interface GalleryImage {
    /** empty string if no caption */
    caption: string;
    file: UploadcareImageStoragePayload;
}

export const isGalleryNode = (value: any): value is GalleryNode =>
    isElementNode<GalleryNode>(value, GALLERY_NODE_TYPE);

import type { Coverage } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, LoadingPlaceholderV2 } from '#components';
import { Coverage as CoverageIcon } from '#icons';
import { useAsyncFn } from '#lib';

import type { ApiError } from '#modules/api';

import { CoverageCard } from './CoverageCard';
import './CoverageElement.scss';
import { FetchingError } from './FetchingError';

// GET /v2/coverage/:id endpoint usually responds in 300-1000 ms
// Depending on whether it has an attachment or URL.
const ESTIMATED_LOADING_DURATION = 300;

interface Props extends RenderElementProps {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    element: CoverageNode;
    fetchCoverage: (id: Coverage['id']) => Promise<Coverage>;
}

export function CoverageElement({
    attributes,
    children,
    dateFormat,
    element,
    fetchCoverage,
}: Props) {
    const coverageId = element.coverage.id;
    const [{ error, loading, value: coverage }, loadCoverage] = useAsyncFn(() => {
        return fetchCoverage(coverageId);
    }, [coverageId, fetchCoverage]);

    useEffect(() => {
        loadCoverage();
    }, [loadCoverage]);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderBlock={() => (
                <>
                    {error && (
                        <FetchingError
                            className="editor-v4-coverage-element__error"
                            error={error as ApiError}
                            onRetry={loadCoverage}
                        />
                    )}

                    {loading && (
                        <LoadingPlaceholderV2.Placeholder
                            className="editor-v4-coverage-element__loading-placeholder"
                            estimatedDuration={ESTIMATED_LOADING_DURATION}
                        >
                            {({ percent }) => (
                                <>
                                    <LoadingPlaceholderV2.Icon icon={CoverageIcon} />
                                    <LoadingPlaceholderV2.Description percent={percent}>
                                        Loading Coverage
                                    </LoadingPlaceholderV2.Description>
                                    <LoadingPlaceholderV2.ProgressBar percent={percent} />
                                </>
                            )}
                        </LoadingPlaceholderV2.Placeholder>
                    )}

                    {coverage && <CoverageCard coverage={coverage} dateFormat={dateFormat} />}
                </>
            )}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}

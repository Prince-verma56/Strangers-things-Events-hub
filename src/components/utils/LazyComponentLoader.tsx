import { Suspense, ComponentType, ReactNode } from 'react';

interface LazyComponentLoaderProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * Minimal loading fallback for lazy-loaded components
 * Prevents layout shift while maintaining performance
 */
const DefaultFallback = () => (
    <div className="w-full h-full min-h-[100px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
    </div>
);

/**
 * Wrapper for lazy-loaded components with Suspense boundary
 * Provides consistent loading states across the app
 */
export const LazyComponentLoader = ({
    children,
    fallback = <DefaultFallback />
}: LazyComponentLoaderProps) => {
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
};

/**
 * HOC to wrap a lazy-loaded component with Suspense
 * Usage: const LazyComponent = withLazyLoading(lazy(() => import('./Component')))
 */
export const withLazyLoading = <P extends object>(
    Component: ComponentType<P>,
    fallback?: ReactNode
) => {
    return (props: P) => (
        <LazyComponentLoader fallback={fallback}>
            <Component {...props} />
        </LazyComponentLoader>
    );
};

export default LazyComponentLoader;

import { useEffect } from 'react';

export const usePageMeta = (title, metaDefinitions) => {
    useEffect(() => {
        // タイトルの保存と変更
        const previousTitle = document.title;
        document.title = title;

        // Metaタグの反映
        metaDefinitions.forEach(({ attr, key, content }) => {
            const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
            let element = document.head.querySelector(selector);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        });

        // クリーンアップ
        return () => {
            document.title = previousTitle;
        };
    }, [title, metaDefinitions]);
};
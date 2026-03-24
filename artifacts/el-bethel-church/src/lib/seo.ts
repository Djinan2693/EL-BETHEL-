import { useEffect } from 'react';
import { churchInfo } from '../data/church';

export function useSEO(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | ${churchInfo.name}`;
    
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
}

import { useState, useEffect, useCallback } from 'react';
import { checkImageUrl } from '@/lib/utils';

interface ImageValidationState {
  isValidating: boolean;
  isValid: boolean | null;
  error: string | null;
}

export function useImageValidation(imageUrl: string | null | undefined) {
  const [validationState, setValidationState] = useState<ImageValidationState>({
    isValidating: false,
    isValid: null,
    error: null,
  });

  const validateImage = useCallback(async (url: string) => {
    if (!url || url.trim() === '') {
      setValidationState({
        isValidating: false,
        isValid: null,
        error: null,
      });
      return;
    }

    setValidationState({
      isValidating: true,
      isValid: null,
      error: null,
    });

    try {
      const result = await checkImageUrl(url);
      setValidationState({
        isValidating: false,
        isValid: result.valid,
        error: result.error || null,
      });
    } catch (error: any) {
      setValidationState({
        isValidating: false,
        isValid: false,
        error: error.message || 'Failed to validate image',
      });
    }
  }, []);

  useEffect(() => {
    // Debounce validation to avoid checking on every keystroke
    const timeoutId = setTimeout(() => {
      if (imageUrl) {
        validateImage(imageUrl);
      } else {
        setValidationState({
          isValidating: false,
          isValid: null,
          error: null,
        });
      }
    }, 800); // Wait 800ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [imageUrl, validateImage]);

  return validationState;
}

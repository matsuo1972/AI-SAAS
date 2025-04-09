export type GenerateImageState = {
    imageUrl?: string;
    error?: string;
    status: 'idle' | 'error' | 'success';
    keyword?: string;
    redirect?: string;
}

export type RemoveBackgroundState = {
    originalImage?: string;
    processedImage?: string;
    status: 'idle' | 'error' | 'success';
    fileName?: string;
    error?: string;
    redirect?: string;
}

export type StripeState = {
    status: 'idle' | 'success' | 'error';
    error: string;
    redirectUrl?: string;
}
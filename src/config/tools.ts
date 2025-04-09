import backgroundRemover from "@/components/dashboard/tools/background-remover";
import ImageGenerator from "@/components/dashboard/tools/image-generator";

export const tools = {
    'image-generator': {
        title: '画像生成',
        description: 'AIを使用して好みの画像を生成してみよう',
        component: ImageGenerator,
    },
    'remove-bg': {
        title: '背景削除',
        description: '画像から背景を自動で削除',
        component: backgroundRemover,
    },
    'optimize': {
        title: '画像最適化',
        description: '画像を最適化してサイズを縮小',
        component: ImageGenerator,
    },
    'setting': {
        title: '画像生成',
        description: 'AIを使用して好みの画像を生成してみよう',
        component: ImageGenerator,
    }
}

export type ToolType = keyof typeof tools;
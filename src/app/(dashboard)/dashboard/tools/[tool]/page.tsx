import PageContainer from '@/components/dashboard/page-container';
import PageHeader from '@/components/dashboard/page-header';
import { tools, ToolType } from '@/config/tools';
import { notFound } from 'next/navigation';

type Params = {
    params: Promise<{ tool: string }>
}

export default async function ToolPage({ params }: Params) {
    const { tool }  = await params;
    const toolType = tool as ToolType;
    const type = tools[toolType];
    
    if (!type) {
        notFound();
    }

    const ToolComponent = type.component;

    return (
    <PageContainer>
        <PageHeader title={type.title} description={type.description} />
        <div className="max-w-2xl">
            <ToolComponent /> 
        </div>
    </PageContainer>
    );
};
import React from 'react';
import { 
    container
} from './layout.module.css'; // no type safety; automatically converts kebab case to camelCase for use in JS
import { Footer} from '../components/footer';
import { Content } from '../components/content';

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {

    return (
        <>
            <div className={container}>
                <Content>
                    {children}
                </Content>
                <Footer />
            </div>
        </>
    )
}
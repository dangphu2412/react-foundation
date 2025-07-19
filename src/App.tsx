import './App.css'
import {type FC, useEffect, useState} from "react";
import {PostsPage} from "@/modules/posts/post-list/PostsPage.tsx";
import {RefTrainingForm} from "@/modules/ref-training-form/ref-training-form.tsx";
import {ListTraining} from "@/modules/list-training/list-training.tsx";

type Props = {
    children: FC<{ path: string }>;
}

function Router({ children }: Props) {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        function onPopStateChange() {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onPopStateChange)


        return () => {
            window.removeEventListener('popstate', onPopStateChange)
        }
    }, []);

    return <>{children({ path })}</>
}

function App() {
  return (
    <Router>
        {({ path }) => {
            if (path === '/posts/add') {
                return <div>Hello add</div>
            }

            if (path === '/ref-training') {
                return <RefTrainingForm />
            }

            if (path === '/list-training') {
                return <ListTraining />
            }

            return <PostsPage />
        }}
    </Router>
  )
}

export default App

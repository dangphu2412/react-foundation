import './App.css'
import {type FC, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {PostsPage} from "@/modules/posts/PostsPage.tsx";

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
                return <Button>Add</Button>
            }

            return <PostsPage />
        }}
    </Router>
  )
}

export default App

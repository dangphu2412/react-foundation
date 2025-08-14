import './App.css'
import {PostListEntryPage} from "@/modules/posts/post-list/post-list-entry-page.tsx";
import {ListTraining} from "@/modules/list-training/list-training.tsx";
import {HookFormZustand, RefTrainingForm} from "@/modules/ref-training-form/ref-training-form.tsx";
import {FileUpload} from "@/modules/file-upload/file-upload.tsx";
import {type FC, useEffect, useState} from "react";
import {AtomicTraining} from "@/modules/atomic-training/atomic-training.tsx";
import {Context1} from "@/modules/context-training/Context1.tsx";
import {Context2} from "@/modules/context-training/Context2.tsx";

type RouterProps = {
  children: FC<{ path: string | null }>;
}

function Router({ children }: RouterProps) {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    function loadPath() {
      console.log(window.location.pathname);
      setPath(window.location.pathname);
    }
    window.addEventListener('popstate', loadPath);

    return () => window.removeEventListener('popstate', loadPath);
  }, []);

  return <>{children({ path: path })}</>
}

function App() {
  return (
    <Router>
        {({ path }) => {
            console.log(path);
            if (path === '/posts/add') {
                return <div>Hello add</div>
            }

            if (path === '/ref-training') {
                return <RefTrainingForm />
            }

            if (path === '/form') {
              return <HookFormZustand />
            }

            if (path === '/list-training') {
                return <ListTraining />
            }

            if (path === '/file') {
              return <FileUpload />
            }

            if (path === '/atomic') {
              return <AtomicTraining/>
            }

            if (path === '/context') {
              return <Context1 />
            }

            if (path === '/context2') {
              return <Context2 />
            }

            return <PostListEntryPage />
        }}
    </Router>
  )
}

export default App

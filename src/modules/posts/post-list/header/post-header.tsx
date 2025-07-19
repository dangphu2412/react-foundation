import {AddPostForm} from "@/modules/posts/add-post/add-new-post.tsx";

type PostListHeaderProps = {
    onPostSave: (newPost: any) => void;
}

export function PostListHeader({ onPostSave }: PostListHeaderProps) {
    return <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-start">Blog Posts</h1>
            <p className="text-muted-foreground mt-2">Discover insights, tutorials, and updates from our team</p>
        </div>

        <AddPostForm onSubmit={onPostSave} />
    </div>
}

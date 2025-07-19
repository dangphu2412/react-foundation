import {useEffect, useState} from "react"
import {PostList} from "@/modules/posts/post-list/list/post-list.tsx";
import {PostListHeader} from "@/modules/posts/post-list/header/post-header.tsx";
import {PostFilter} from "@/modules/posts/post-list/filter/post-filter.tsx";

type Post = {
    id: number,
    title: string,
    excerpt: string,
    author: string,
    date: string,
    category: string,
    image: string,
    readTime: string,
};

// Mock data for blog posts
const blogPosts: Post[] = [
    {
        id: 1,
        title: "Getting Started with Next.js 15",
        excerpt:
            "Learn about the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
        author: "Sarah Johnson",
        date: "2024-01-15",
        category: "Development",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "The Future of Web Development",
        excerpt:
            "Exploring emerging trends and technologies that will shape the future of web development in the coming years.",
        author: "Mike Chen",
        date: "2024-01-12",
        category: "Technology",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "Building Responsive Layouts with CSS Grid",
        excerpt: "Master CSS Grid to create flexible and responsive layouts that work perfectly across all device sizes.",
        author: "Emily Rodriguez",
        date: "2024-01-10",
        category: "Design",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "6 min read",
    },
    {
        id: 4,
        title: "JavaScript Performance Optimization Tips",
        excerpt:
            "Discover practical techniques to optimize your JavaScript code for better performance and user experience.",
        author: "David Kim",
        date: "2024-01-08",
        category: "Development",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "7 min read",
    },
    {
        id: 5,
        title: "UX Design Principles for Developers",
        excerpt: "Essential UX design principles that every developer should know to create better user experiences.",
        author: "Lisa Wang",
        date: "2024-01-05",
        category: "Design",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "4 min read",
    },
    {
        id: 6,
        title: "Introduction to TypeScript",
        excerpt:
            "A comprehensive guide to getting started with TypeScript and how it can improve your JavaScript development.",
        author: "Alex Thompson",
        date: "2024-01-03",
        category: "Development",
        image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
        readTime: "9 min read",
    },
]

export function PostListEntryPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedAuthor, setSelectedAuthor] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [posts, setPosts] = useState<Post[]>([])

    const categories = [...new Set(blogPosts.map((post) => post.category))]
    const authors = [...new Set(blogPosts.map((post) => post.author))]

    // Filter and sort posts
    const filteredPosts = blogPosts
        .filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
            const matchesAuthor = selectedAuthor === "all" || post.author === selectedAuthor

            return matchesSearch && matchesCategory && matchesAuthor
        })
        .toSorted((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            } else if (sortBy === "oldest") {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            } else if (sortBy === "title") {
                return a.title.localeCompare(b.title)
            }
            return 0
        })

    function add(newPost: Post) {
        const post = {
            ...newPost,
            id: posts.length + 1,
            date: new Date().toISOString().split("T")[0],
            image: newPost.image || "/placeholder.svg?height=200&width=400",
        }
        setPosts([post, ...posts])
    }

    function clearFilters() {
        setSearchTerm("")
        setSelectedCategory("all")
        setSelectedAuthor("all")
    }

    useEffect(function syncAPIPosts() {
        setPosts(blogPosts)
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <PostListHeader onPostSave={add} />

                <PostFilter
                    searchTerm={searchTerm}
                    selectedAuthor={selectedAuthor}
                    selectedCategory={selectedCategory}
                    sortBy={sortBy}
                    authors={authors}
                    categories={categories}
                    onSortChange={setSortBy}
                    onSearchChange={setSearchTerm}
                    onAuthorChange={setSelectedAuthor}
                    onCategoryChange={setSelectedCategory}
                />

                <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                        Showing {filteredPosts.length} of {blogPosts.length} posts
                    </p>
                </div>

                <PostList posts={filteredPosts} onClearFilterWhenNoItemFound={clearFilters} />
            </div>
        </div>
    )
}

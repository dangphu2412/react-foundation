import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {CalendarDays, Search, User} from "lucide-react"
import {AddPostForm} from "@/modules/posts/AddNewPost.tsx";

// Mock data for blog posts
const blogPosts = [
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

export function PostsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedAuthor, setSelectedAuthor] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [posts, setPosts] = useState(blogPosts)

    // Get unique categories and authors for filter options
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
        .sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            } else if (sortBy === "oldest") {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            } else if (sortBy === "title") {
                return a.title.localeCompare(b.title)
            }
            return 0
        })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleAddPost = (newPost: any) => {
        const post = {
            ...newPost,
            id: posts.length + 1,
            date: new Date().toISOString().split("T")[0],
            image: newPost.image || "/placeholder.svg?height=200&width=400",
        }
        setPosts([post, ...posts])
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-start">Blog Posts</h1>
                        <p className="text-muted-foreground mt-2">Discover insights, tutorials, and updates from our team</p>
                    </div>
                    <AddPostForm onSubmit={handleAddPost} />
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Author" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Authors</SelectItem>
                                {authors.map((author) => (
                                    <SelectItem key={author} value={author}>
                                        {author}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                                <SelectItem value="title">Title A-Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                        Showing {filteredPosts.length} of {blogPosts.length} posts
                    </p>
                </div>

                {/* Blog posts grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary">{post.category}</Badge>
                                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
                                        <a href={`/blog/${post.id}`}>
                                            {post.title}
                                        </a>
                                    </h3>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                </CardContent>

                                <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="h-3 w-3" />
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-muted-foreground mb-4">
                            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("")
                                setSelectedCategory("all")
                                setSelectedAuthor("all")
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

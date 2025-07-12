"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, ImagePlus, Plus, X } from "lucide-react"

interface BlogPost {
    title: string
    excerpt: string
    content: string
    author: string
    category: string
    tags: string[]
    image: string
    readTime: string
}

interface AddPostFormProps {
    onSubmit: (post: BlogPost) => void
    trigger?: React.ReactNode
}

export function AddPostForm({ onSubmit, trigger }: AddPostFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState<BlogPost>({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        tags: [],
        image: "",
        readTime: "",
    })

    const [currentTag, setCurrentTag] = useState("")

    const categories = ["Development", "Design", "Technology", "Business", "Tutorial", "News"]
    const authors = ["Sarah Johnson", "Mike Chen", "Emily Rodriguez", "David Kim", "Lisa Wang", "Alex Thompson"]

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        } else if (formData.title.length < 5) {
            newErrors.title = "Title must be at least 5 characters"
        }

        if (!formData.excerpt.trim()) {
            newErrors.excerpt = "Excerpt is required"
        } else if (formData.excerpt.length < 20) {
            newErrors.excerpt = "Excerpt must be at least 20 characters"
        }

        if (!formData.content.trim()) {
            newErrors.content = "Content is required"
        } else if (formData.content.length < 100) {
            newErrors.content = "Content must be at least 100 characters"
        }

        if (!formData.author) {
            newErrors.author = "Author is required"
        }

        if (!formData.category) {
            newErrors.category = "Category is required"
        }

        if (!formData.readTime.trim()) {
            newErrors.readTime = "Read time is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            onSubmit(formData)

            // Reset form
            setFormData({
                title: "",
                excerpt: "",
                content: "",
                author: "",
                category: "",
                tags: [],
                image: "",
                readTime: "",
            })

            setIsOpen(false)
            setErrors({})
        } catch (error) {
            console.error("Error submitting post:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (field: keyof BlogPost, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()],
            }))
            setCurrentTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    const estimateReadTime = (content: string) => {
        const wordsPerMinute = 200
        const wordCount = content.trim().split(/\s+/).length
        const readTime = Math.ceil(wordCount / wordsPerMinute)
        return `${readTime} min read`
    }

    // Auto-calculate read time when content changes
    const handleContentChange = (value: string) => {
        handleInputChange("content", value)
        if (value.trim()) {
            const estimatedTime = estimateReadTime(value)
            handleInputChange("readTime", estimatedTime)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Post
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="min-w-2xl lg:min-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Blog Post</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="Enter post title..."
                                    className={errors.title ? "border-red-500" : ""}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt *</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                                    placeholder="Brief description of the post..."
                                    rows={3}
                                    className={errors.excerpt ? "border-red-500" : ""}
                                />
                                <p className="text-xs text-muted-foreground">{formData.excerpt.length}/200 characters</p>
                                {errors.excerpt && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.excerpt}
                                    </p>
                                )}
                            </div>

                            {/* Author & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author *</Label>
                                    <Select value={formData.author} onValueChange={(value) => handleInputChange("author", value)}>
                                        <SelectTrigger className={errors.author ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select author" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {authors.map((author) => (
                                                <SelectItem key={author} value={author}>
                                                    {author}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.author && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.author}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="tags"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Add a tag..."
                                    />
                                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                                        Add
                                    </Button>
                                </div>
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                {tag}
                                                <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Featured Image */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Featured Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => handleInputChange("image", e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <Button type="button" variant="outline" size="sm">
                                        <ImagePlus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {formData.image && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.image || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-md border"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.svg?height=128&width=256"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Read Time */}
                            <div className="space-y-2">
                                <Label htmlFor="readTime">Estimated Read Time *</Label>
                                <Input
                                    id="readTime"
                                    value={formData.readTime}
                                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                                    placeholder="5 min read"
                                    className={errors.readTime ? "border-red-500" : ""}
                                />
                                {errors.readTime && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.readTime}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    placeholder="Write your blog post content here..."
                                    rows={20}
                                    className={`min-h-[400px] ${errors.content ? "border-red-500" : ""}`}
                                />
                                <p className="text-xs text-muted-foreground">{formData.content.length} characters</p>
                                {errors.content && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.content}
                                    </p>
                                )}
                            </div>

                            {/* Preview Card */}
                            {formData.title && formData.excerpt && (
                                <Card className="mt-4">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Preview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <h3 className="font-semibold">{formData.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{formData.excerpt}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            {formData.category && <Badge variant="secondary">{formData.category}</Badge>}
                                            {formData.readTime && <span>{formData.readTime}</span>}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Publishing..." : "Publish Post"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

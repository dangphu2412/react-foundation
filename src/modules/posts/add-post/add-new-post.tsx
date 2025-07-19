"use client"

import type React from "react"
import {useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx"
import {ImagePlus, Plus, X} from "lucide-react"

// Zod schema for form validation
const blogPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
    excerpt: z
        .string()
        .min(20, "Excerpt must be at least 20 characters")
        .max(200, "Excerpt must be less than 200 characters"),
    content: z
        .string()
        .min(100, "Content must be at least 100 characters")
        .max(10000, "Content must be less than 10,000 characters"),
    author: z.string().min(1, "Author is required"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()).default([]),
    image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    readTime: z.string().min(1, "Read time is required"),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

interface AddPostFormProps {
    onSubmit: (post: BlogPostFormData) => void
    trigger?: React.ReactNode
}

export function AddPostForm({ onSubmit, trigger }: AddPostFormProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentTag, setCurrentTag] = useState("")

    const categories = ["Development", "Design", "Technology", "Business", "Tutorial", "News"]
    const authors = ["Sarah Johnson", "Mike Chen", "Emily Rodriguez", "David Kim", "Lisa Wang", "Alex Thompson"]

    const form = useForm({
        resolver: zodResolver(blogPostSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            author: "",
            category: "",
            tags: [],
            image: "",
            readTime: "",
        }
    })

    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { isSubmitting },
    } = form

    const estimateReadTime = (content: string) => {
        const wordsPerMinute = 200
        const wordCount = content.trim().split(/\s+/).length
        const readTime = Math.ceil(wordCount / wordsPerMinute)
        return `${readTime} min read`
    }

    const handleContentChange = (value: string) => {
        setValue("content", value)
        if (value.trim()) {
            const estimatedTime = estimateReadTime(value)
            setValue("readTime", estimatedTime)
        }
    }

    const addTag = () => {
        const tags = getValues('tags') ?? [];

        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            const newTags = [...tags, currentTag.trim()]
            setValue("tags", newTags)
            setCurrentTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setValue("tags",
            (getValues('tags') ?? [])
            .filter((tag) => tag !== tagToRemove)
        )
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    const onFormSubmit = async (data: BlogPostFormData) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            onSubmit(data)

            // Reset form and close modal
            form.reset()
            setIsOpen(false)
            setCurrentTag("")
        } catch (error) {
            console.error("Error submitting post:", error)
        }
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            form.reset()
            setCurrentTag("")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Post
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Blog Post</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* Title */}
                                <FormField
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter post title..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Excerpt */}
                                <FormField
                                    control={control}
                                    name="excerpt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Excerpt *</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Brief description of the post..." rows={3} {...field} />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground">{field.value?.length || 0}/200 characters</p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Author & Category */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select author" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {authors.map((author) => (
                                                            <SelectItem key={author} value={author}>
                                                                {author}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>

                                    <Controller
                                        control={control}
                                        name={'tags'}
                                        render={({ field  }) => {
                                            return <>
                                                 <div className="flex gap-2">
                                                     <Input
                                                         id="tags"
                                                         value={currentTag}
                                                         onChange={(e) => setCurrentTag(e.target.value)}
                                                         onKeyDown={handleKeyPress}
                                                         placeholder="Add a tag..."
                                                     />
                                                     <Button type="button" onClick={addTag} variant="outline" size="sm">
                                                         Add
                                                     </Button>
                                                 </div>

                                                 <div className="flex flex-wrap gap-2 mt-2">
                                                     {field.value?.map((tag) => (
                                                         <Badge key={tag} variant="secondary" className="flex items-center gap-1" >
                                                             {tag}
                                                             <span onClick={() => removeTag(tag)}>
                                                                 <X className="h-3 w-3 cursor-pointer hover:text-red-500"  />
                                                             </span>
                                                         </Badge>
                                                     ))}
                                                 </div>
                                             </>
                                        }} />
                                </div>

                                {/* Featured Image */}
                                <FormField
                                    control={control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Featured Image URL</FormLabel>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                                </FormControl>
                                                <Button type="button" variant="outline" size="sm">
                                                    <ImagePlus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {field.value && (
                                                <div className="mt-2">
                                                    <img
                                                        src={field.value || "/placeholder.svg"}
                                                        alt="Preview"
                                                        className="w-full h-32 object-cover rounded-md border"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/placeholder.svg?height=128&width=256"
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Read Time */}
                                <FormField
                                    control={control}
                                    name="readTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estimated Read Time *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="5 min read" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Right Column - Content */}
                            <div className="space-y-4">
                                <FormField
                                    control={control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Write your blog post content here..."
                                                    rows={20}
                                                    className="min-h-[400px]"
                                                    {...field}
                                                    onChange={(e) => handleContentChange(e.target.value)}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground">{field.value?.length || 0} characters</p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                </Form>
            </DialogContent>
        </Dialog>
    )
}

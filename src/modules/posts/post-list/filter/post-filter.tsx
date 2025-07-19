import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type PostFilterProps = {
    categories: string[];
    selectedCategory: string;
    authors: string[];
    selectedAuthor: string;
    sortBy: string;
    searchTerm: string;
    onSearchChange: (search: string) => void;
    onCategoryChange: (value: string) => void;
    onAuthorChange: (value: string) => void;
    onSortChange: (value: string) => void;
}

export function PostFilter({ searchTerm, sortBy, categories, selectedCategory, selectedAuthor, authors, onSearchChange, onAuthorChange, onCategoryChange, onSortChange } :PostFilterProps) {
    return <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
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

            <Select value={selectedAuthor} onValueChange={onAuthorChange}>
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

            <Select value={sortBy} onValueChange={onSortChange}>
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
}
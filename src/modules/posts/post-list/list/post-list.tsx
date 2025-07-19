import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {CalendarDays, Search, User} from "lucide-react";
import {formatDateDDMMYYYY} from "@/modules/shared/date/date.ts";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    posts: any[];
    onClearFilterWhenNoItemFound: () => void
}

export function PostList({posts, onClearFilterWhenNoItemFound}: Props) {
    if (!posts.length) {
        return <NoPostFoundBanner onClearFilter={onClearFilterWhenNoItemFound} />
    }

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
                        <span>{formatDateDDMMYYYY(post.date)}</span>
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
}

type NoPostFoundBannerProps = {
    onClearFilter: () => void
}

function NoPostFoundBanner({onClearFilter} :NoPostFoundBannerProps) {
    return  <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
        </div>

        <Button
            variant="outline"
            onClick={onClearFilter}
        >
            Clear Filters
        </Button>
    </div>
}

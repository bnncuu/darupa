
import * as React from "react";
import { cn } from "@/lib/utils";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "context" | "issues" | "inquiry" | "product";
  title: string;
  content?: string;
  count?: number;
  status?: string;
  metricLabel?: string;
  metricValue?: string;
  footer?: React.ReactNode;
  progress?: number;
  category?: string;
  date?: string;
  author?: string;
  readTime?: string;
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      className,
      variant = "context",
      title,
      content,
      count,
      status,
      metricLabel,
      metricValue,
      footer,
      progress,
      category,
      date,
      author,
      readTime,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col",
          className
        )}
        {...props}
      >
        {variant === "context" && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{category}</span>
              <span>{date}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                {title}
              </h3>
              {content && <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>}
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{author}</span>
              <span>{readTime}</span>
            </div>
          </div>
        )}

        {variant === "issues" && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {title}
              </h3>
              {content && <p className="text-sm text-muted-foreground">{content}</p>}
            </div>
            <div className="text-4xl font-bold">{count}</div>
            {status && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {status}
              </span>
            )}
          </div>
        )}

        {variant === "inquiry" && (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {title}
              </h3>
            </div>
            <div className="flex-1">{content}</div>
            {footer && <div className="pt-4 border-t">{footer}</div>}
          </div>
        )}

        {variant === "product" && (
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {title}
              </h3>
              {metricLabel && metricValue && (
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-muted-foreground">
                    {metricLabel}
                  </span>
                  <span className="text-2xl font-bold">{metricValue}</span>
                </div>
              )}
            </div>
            {content && <p className="text-sm text-muted-foreground">{content}</p>}
            {progress !== undefined && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

DataCard.displayName = "DataCard";

export { DataCard };
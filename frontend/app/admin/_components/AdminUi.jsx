"use client";

import Link from "next/link";
import { PencilIcon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function adminToastSuccess(title, description) {
  toast.success(title, description ? { description } : undefined);
}

export function adminToastError(title, description) {
  toast.error(title, description ? { description } : undefined);
}

export function AdminPageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#333]">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

export function AdminAlert({ children, variant = "error", className }) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variant === "error" && "border-destructive/30 bg-destructive/10 text-destructive",
        variant === "success" && "border-green-200 bg-green-50 text-green-800",
        variant === "warning" && "border-amber-200 bg-amber-50 text-amber-900",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminFormCard({ title, description, children, className, contentClassName }) {
  return (
    <Card className={cn("max-w-4xl shadow-sm", className)}>
      {(title || description) && (
        <CardHeader className="border-b">
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      )}
      <CardContent className={cn("pt-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

export function AdminToolbarCard({ children, className }) {
  return (
    <Card className={cn("mt-6 shadow-sm", className)}>
      <CardContent className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        {children}
      </CardContent>
    </Card>
  );
}

export function AdminField({ label, htmlFor, children, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export function AdminInput({ className, ...props }) {
  return <Input className={cn("h-10 bg-white", className)} {...props} />;
}

export function AdminTextarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-input bg-white px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function AdminSelect({
  id,
  value,
  onValueChange,
  placeholder = "Select an option",
  options = [],
  className,
  disabled,
}) {
  return (
    <Select value={value ?? ""} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger id={id} className={cn("h-10 w-full bg-white", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {options.map((option) => (
          <SelectItem
            key={option.value === "" ? "__empty__" : String(option.value)}
            value={String(option.value)}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
  variant = "destructive",
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              onConfirm?.();
            }}
            className={
              variant === "destructive"
                ? "bg-destructive text-white hover:bg-destructive/90"
                : "bg-[#16568D] text-white hover:bg-[#124570]"
            }
          >
            {loading ? "Please wait..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AdminFormActions({ children, className }) {
  return <div className={cn("flex flex-wrap items-center gap-3 pt-2", className)}>{children}</div>;
}

export function AdminPrimaryButton({ className, ...props }) {
  return (
    <Button
      className={cn("h-10 bg-[#16568D] px-5 font-semibold text-white hover:bg-[#124570]", className)}
      {...props}
    />
  );
}

export function AdminOutlineButton({ className, ...props }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-10 border-[#16568D] bg-white text-[#16568D] hover:bg-[#16568D] hover:text-white",
        className
      )}
      {...props}
    />
  );
}

export function AdminLinkButton({ href, children, variant = "primary", className, ...props }) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 border-[#16568D] bg-white text-[#16568D] hover:bg-[#16568D] hover:text-white",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant: "outline" }), "h-10", className)}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-10 bg-[#16568D] px-5 font-semibold text-white hover:bg-[#124570]",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function AdminStatusBadge({ active, trueLabel = "Active", falseLabel = "Inactive" }) {
  return (
    <Badge variant={active ? "default" : "secondary"} className={active ? "bg-[#16568D]" : undefined}>
      {active ? trueLabel : falseLabel}
    </Badge>
  );
}

export function AdminYesBadge({ value, trueLabel = "Yes", falseLabel = "No" }) {
  if (!value) {
    return <span className="text-muted-foreground">—</span>;
  }

  return <Badge variant="outline">{trueLabel}</Badge>;
}

export function AdminTableEditLink({ href, label = "Edit" }) {
  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "text-[#16568D] hover:bg-[#16568D]/10 hover:text-[#16568D]"
      )}
    >
      <PencilIcon />
    </Link>
  );
}

export function AdminTableDeleteButton({ onClick, disabled, label = "Delete" }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2Icon />
    </Button>
  );
}

export function AdminTableActions({ editHref, onDelete, deleting, editLabel = "Edit", deleteLabel = "Delete" }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <AdminTableEditLink href={editHref} label={editLabel} />
      <AdminTableDeleteButton onClick={onDelete} disabled={deleting} label={deleteLabel} />
    </div>
  );
}

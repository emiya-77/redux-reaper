"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type FieldValue, type FieldValues, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar1, Edit } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { updateTask } from "@/redux/features/task/taskSlice"
import type { ITask } from "@/types"
import { selectUsers } from "@/redux/features/user/userSlice"
import { useState } from "react"

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
] as const;

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(50, "Title cannot exceed 50 characters."),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters.")
    .optional(),
  priority: z.enum(["high", "medium", "low"]),
  dueDate: z.date(),
  assignedTo: z.string().nullable().optional(),
})

type FormData = z.infer<typeof formSchema>

interface EditTaskModalProps {
  task: ITask;
}

export function EditTaskModal({task}: EditTaskModalProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo
    },
  })

  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    dispatch(updateTask(
      {
        ...task,
        ...data
      } as ITask)
    )

    toast.success("Task updated successfully!")
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            variant="link"
            className="p-0 text-gray-400 hover:text-gray-300 cursor-pointer"
        >
            <Edit/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Finish Redux project"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller 
              name="description" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}> 
                  <FieldLabel htmlFor="form-rhf-demo-description"> 
                    Description 
                  </FieldLabel> 
                  <InputGroup> 
                    <InputGroupTextarea 
                      {...field} 
                      id="form-rhf-demo-description" 
                      placeholder="I'm having an issue with the login button on mobile." 
                      rows={6} 
                      className="min-h-24 resize-none" 
                      aria-invalid={fieldState.invalid} 
                    /> 
                    <InputGroupAddon align="block-end"> 
                      <InputGroupText className="tabular-nums"> 
                        {field.value.length}/100 characters 
                      </InputGroupText> 
                    </InputGroupAddon> 
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>)} 
              />

            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-priority">
                      Priority
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-priority"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned" className="-mt-32">
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="assignedTo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-priority">
                      Assign To
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-priority"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select">
                        {users.find(user => user.id === field.value)?.name ?? "Select"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position="item-aligned" className="-mt-32">
                      <SelectItem value={null}>Select</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="dueDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Due Date</FieldLabel>

                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                          aria-invalid={fieldState.invalid}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a due date</span>
                          )}

                          <Calendar1 />
                        </Button>
                      }
                    />

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <div className="flex justify-end gap-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
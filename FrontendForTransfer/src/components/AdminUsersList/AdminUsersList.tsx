import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../admin/components/ui/table";

import Badge from "../../admin/components/ui/badge/Badge";

import type {ISearchedUser} from "../../models/User/ISearchedUser.ts";

interface UsersTableProps {
    users: ISearchedUser[];
}

export default function AdminUsersList({ users }: UsersTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                User
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                Email
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                Roles
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                {/* User */}
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 overflow-hidden rounded-full">
                                            <img
                                                src={user.image || "/images/user/default-avatar.jpg"}
                                                alt={user.fullName}
                                                className="w-10 h-10 object-cover"
                                            />
                                        </div>
                                        <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.fullName}
                      </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Email */}
                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                                    {user.email}
                                </TableCell>

                                {/* Roles */}
                                <TableCell className="px-4 py-3 text-start">
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles.map((role) => (
                                            <Badge
                                                key={role}
                                                size="sm"
                                                color={role === "Admin" ? "success" : "info"}
                                            >
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                {/* Status */}
                                <TableCell className="px-4 py-3">
                                    <Badge size="sm" color="success">
                                        Active
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {users.length === 0 && (
                    <div className="py-10 text-center text-gray-500">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
}
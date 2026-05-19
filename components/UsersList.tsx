"use client";

import { useState, useMemo, useCallback } from "react";
import { User, UserDetail } from "@/types/user";
import { FilterBar } from "@/components/FilterBar";
import { UserCard } from "@/components/UserCard";
import { UserModal } from "@/components/UserModal";
import { Users } from "lucide-react";

interface UsersListProps {
  initialUsers: User[];
}

export function UsersList({ initialUsers }: UsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialUsers.filter((user) => {
      // Company filter chips
      if (activeFilters.length > 0 && !activeFilters.includes(user.company.name)) {
        return false;
      }
      // Search query
      if (q) {
        return (
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          user.company.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [initialUsers, searchQuery, activeFilters]);

  const handleFilterByCompany = useCallback((company: string) => {
    setActiveFilters((prev) =>
      prev.includes(company) ? prev.filter((f) => f !== company) : [...prev, company]
    );
  }, []);

  const handleRemoveFilter = useCallback((filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  }, []);

  const handleClearAll = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery("");
  }, []);

  const handleCardClick = useCallback(async (user: User) => {
    setIsModalOpen(true);
    setIsLoadingUser(true);
    setSelectedUser(null);
    try {
      const res = await fetch(`/api/users/${user.id}`);
      const data: UserDetail = await res.json();
      setSelectedUser(data);
    } catch {
      setSelectedUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Filter bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {filteredUsers.length === initialUsers.length
              ? `${initialUsers.length} users`
              : `${filteredUsers.length} of ${initialUsers.length} users`}
          </p>
        </div>

        {/* User cards */}
        {filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={handleCardClick}
                onFilterByCompany={handleFilterByCompany}
                activeFilters={activeFilters}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--surface-2)" }}
            >
              <Users size={20} style={{ color: "var(--ink-muted)" }} />
            </div>
            <p className="font-medium mb-1" style={{ color: "var(--ink)" }}>
              No users found
            </p>
            <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
              Try adjusting your search or clearing filters
            </p>
            <button
              onClick={handleClearAll}
              className="mt-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-100"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          isLoading={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

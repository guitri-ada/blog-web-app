import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useUserProfile from "./useUserProfile";
import { jest, describe, beforeEach, it, expect } from '@jest/globals';

jest.mock("axios");

describe("useUserProfile", () => {
    const username = "testuser";
    const profileData = {
        firstname: "John",
        lastname: "Doe",
        bio: "Software Developer",
    };
    const csrfTokenData = { csrfToken: "test-csrf-token" };

    beforeEach(() => {
        axios.get.mockClear();
    });

    it("should fetch user profile and CSRF token on mount", async () => {
        axios.get.mockResolvedValueOnce({ data: profileData });
        axios.get.mockResolvedValueOnce({ data: csrfTokenData });

        const { result, waitForNextUpdate } = renderHook(() => useUserProfile(username));

        await waitForNextUpdate();

        expect(result.current.profile).toEqual(profileData);
        expect(result.current.formData).toEqual(profileData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("");
        expect(result.current.csrfToken).toBe(csrfTokenData.csrfToken);
    });

    it("should handle error when fetching user profile fails", async () => {
        axios.get.mockRejectedValueOnce(new Error("Failed to fetch user profile"));
        axios.get.mockResolvedValueOnce({ data: csrfTokenData });

        const { result, waitForNextUpdate } = renderHook(() => useUserProfile(username));

        await waitForNextUpdate();

        expect(result.current.profile).toBe(null);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Failed to fetch user profile");
    });

    it("should update formData when handleChange is called", () => {
        const { result } = renderHook(() => useUserProfile(username));

        act(() => {
            result.current.handleChange({ target: { name: "firstname", value: "Jane" } });
        });

        expect(result.current.formData.firstname).toBe("Jane");
    });
});
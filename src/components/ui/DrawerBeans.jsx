"use client";

import { Drawer, Portal, CloseButton } from "@chakra-ui/react"; // Removed Button import
import { useState } from "react";

const DrawerBeans = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root size="md" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <button style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px" }}>
          Open Drawer
        </button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              {/* Replaced Chakra UI Button with standard HTML button */}
              <button style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px" }}>
                Cancel
              </button>
              {/* Replaced Chakra UI Button with standard HTML button */}
              <button style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px" }}>
                Save
              </button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              {/* Keep the Chakra CloseButton for consistent styling */}
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerBeans;

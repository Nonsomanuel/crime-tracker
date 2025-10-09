"use client";

import { useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FirestoreTest() {
  useEffect(() => {
    const testWrite = async () => {
      try {
        await addDoc(collection(db, "crimeReports"), {
          test: "Hello from Firestore test page",
          createdAt: serverTimestamp(),
        });
        console.log("✅ Firestore write success");
      } catch (err) {
        console.error("❌ Firestore write error:", err);
      }
    };

    testWrite();
  }, []);

  return (
    <div className="p-6 text-center text-gray-700">
      🔍 Testing Firestore write... Check your console for results.
    </div>
  );
}

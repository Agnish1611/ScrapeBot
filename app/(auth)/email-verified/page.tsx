import React from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const EmailVerified = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-orange-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Email Verified!
            </h1>
            <p className="text-orange-700">
              Your email has been successfully verified.
            </p>
          </div>

          <Link href="/setup">
            <button className="bg-orange-500 mt-10 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium">
              Go to Homepage
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerified;

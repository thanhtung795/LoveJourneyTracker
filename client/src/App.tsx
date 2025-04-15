import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import ConfessionApp from "@/pages/ConfessionApp";
import Dashboard from "@/pages/Dashboard";
import ViewResult from "@/pages/ViewResult";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ConfessionApp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/view-result" component={ViewResult} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;

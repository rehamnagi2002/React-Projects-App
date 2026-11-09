1- HOCs should be applied outside the component at the module level because creating them inside the component causes React to receive a new component type on every render.

2- The withLoad uses TypeScript generics, intersection types, and the rest operator to make sure that isLoading is used by the HOC and is not passed to the wrapped component.

3- when the user try to opens dashboard/projects the route is protected with withAuth it checks if the user = null with useAuth() and then navigate to login

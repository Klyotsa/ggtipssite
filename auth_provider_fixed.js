// Исправленный AuthProvider с реальными API вызовами
const ir = "/backend/api";

const sr = ({children}) => {
    const [t, n] = React.useState(null);
    const [i, s] = React.useState(false);
    const [a, o] = React.useState(true);
    
    React.useEffect(() => {
        const e = localStorage.getItem("user");
        if (e) {
            n(JSON.parse(e));
            s(true);
        }
        o(false);
        
        const r = e => {
            if (e.key === "user") {
                const r = e.newValue ? JSON.parse(e.newValue) : null;
                n(r);
                s(!!r);
            }
        };
        
        window.addEventListener("storage", r);
        return () => window.removeEventListener("storage", r);
    }, []);
    
    return React.createElement(nr.Provider, {
        value: {
            user: t,
            setUser: n,
            login: async (e, r) => {
                try {
                    const t = await fetch(`${ir}/login.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({login: e, password: r}),
                        credentials: "include"
                    });
                    const i = await t.json();
                    if (!t.ok) throw new Error(i.error || "Login failed");
                    n(i.user);
                    s(true);
                    localStorage.setItem("user", JSON.stringify(i.user));
                } catch (t) {
                    console.error("Login failed:", t);
                    throw t;
                }
            },
            register: async (e, r, t) => {
                try {
                    const a = await fetch(`${ir}/register.php`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({email: e, username: t, password: r})
                    });
                    const o = await a.json();
                    if (!a.ok) throw new Error(o.error || "Registration failed");
                    
                    const l = {
                        id: o.user_id?.toString() || "",
                        email: e,
                        username: t,
                        avatar: null
                    };
                    n(l);
                    s(true);
                    localStorage.setItem("user", JSON.stringify(l));
                } catch (a) {
                    console.error("Registration failed:", a);
                    throw a;
                }
            },
            logout: () => {
                n(null);
                s(false);
                localStorage.removeItem("user");
            },
            isAuthenticated: i,
            isAuthLoading: a
        },
        children: r
    });
};

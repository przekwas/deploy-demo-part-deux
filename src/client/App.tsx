import * as React from 'react';

const App = (props: AppProps) => {
	const [users, setUsers] = React.useState<{ id: number; email: string; created_at: Date }[]>([]);

	React.useEffect(() => {
		fetch('/api/users')
			.then(r => r.json())
			.then(users => setUsers(users));
	}, []);

	return (
		<main className="container">
			<section className="row justify-content-center mt-5">
				<div className="col-10 text-center">
					<h1 className="display-1">Join Our Cult Today!</h1>
					<p className="text-muted">Just look at all these saps .. I mean users!</p>
				</div>
				<div className="col-7">
					<ul className="list-group list-group-flush">
						{users.map(user => (
							<li
								key={user.id}
								className="list-group-item py-3 d-flex justify-content-center">
								<span>{user.email}</span>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

type AppProps = {};

export default App;

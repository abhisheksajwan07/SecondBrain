// interface User {
//   name: string;
//   age: number;
// }
// function sum(user1: User, user2: User) {
//   return user1.name + user2.age;
// }
// const age = sum(
//   {
//     name: "abhi",
//     age: 23,
//   },
//   { name: "kaku", age: 21 }
// );
// console.log(age)

//  PARTIAL
// interface User {
//   name: string;
//   age: number;
//   id:string;
//   email:string;
//   password:string;
// }
// type UpdateProps = Pick<User, "age" | "email" | "password">;

// type UpdatePropsOptional = Partial<UpdateProps>

// function updateUser(updatedProps : UpdatePropsOptional){}

// updateUser({});  Valid - koi field bhi na do

// updateUser({ age: 25 }); sirf age update

// updateUser({ email: "new@example.com", password: "secret123" });  kuch fields update

// updateUser({ age: 30, email: "a@b.com", password: "1234" });  sab update

//READ ONLY

// type User = {
//   readonly name: string;
//   readonly age: number;
// };
// const user: User = {
//   name: "john",
//   age: 21,
// };
// user.age = 21;

// OR;

// type User = {
//   name: string;
//   age: number;
// };
// const user : Readonly<User> = {
//     name:"john",
//     age:21
// }
// user.age=21;

//a config that shouldn't be altered after intialization

// interface Config{
//     endpoint:string;
//     apikey:string;
// }
// const config:Readonly<Config>={
//     endpoint:"https://api.example.com",
//     apikey:"abcbdh2716",
// }
// config.apikey ="avhssgsha"



// type User = {
//   id: string;
//   username: string;
// };
//  Ye ek simple User type hai — har user ka id aur username hoga.

//  type Users = {
//   [key: string]: User;
// };
// Ye index signature hai.
// Matlab: Users ek object hoga jisme har key (string) ka value ek User type ka object hoga.

// const users : Users={
//   "rasqdq1": {
//     id: "rasqdq1",
//     username: "gds"
//   },
//   "ras1drq": {
//     id: "ras1drq",
//     username: "ras1drq"
//   }
// };


// RECORD
// type Users = {
//   [key: string]: User;
// };

// IS EQUAL TO

// type Users = Record<string, User>;


// another key value pair Syntax

// const users= new Map()
// users.set("rasa",{name:"ADa",age:30})
// users.set("rasaa",{name:"ADa",age:30})
// const user= users.get("rasa");
// users.delete("rasa");


// type User = {
//   id: string;
//   username: string;
// };
// const usersMap = new Map<string, User>();
// usersMap.set("abc123", { id: "abc123", username: "Abhi" });
// usersMap.set("xyz456", { id: "xyz456", username: "Raj" });
// console.log(users["abc123"].username); 


const userProfileSchema = z.object({
  name: z.string(),
  email: z.string().email().optional()
});

// 🔹 Infer TypeScript type from Zod schema
export type FinalUserSchema = z.infer<typeof userProfileSchema>;

// 🔹 PUT route with validation
app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({
      error: "Invalid data",
      details: result.error.flatten()
    });
  }

  //  Safe & typed updateBody
  const updateBody: FinalUserSchema = result.data;

  // Now you can safely use updateBody.name and updateBody.email
  res.status(200).json({
    message: "Profile updated successfully",
    data: updateBody
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
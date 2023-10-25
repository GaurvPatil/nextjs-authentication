import { connect } from "@/dbConfig/dbconfig.js";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 400,
        }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    console.log(saveUser);

    return NextResponse.json(
      { msg: "User created Successfully", success: true, saveUser },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

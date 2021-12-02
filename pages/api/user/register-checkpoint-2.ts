import type { NextApiRequest, NextApiResponse } from "next";
import { usersRepo } from './../../../helpers/api/userRepo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
        try {
            const { username, email, password, repeatPassword } =
            req.body;

            // Check email validate
            const validateEmail = await usersRepo.validateEmail(email);
            if(!validateEmail) return res.status(400).json({eng: "The email you entered is not a valid email. Please double check your email.", kor: "입력하신 이메일은 유효한 이메일이 아닙니다. 이메일을 다시 확인해주세요"})

            // Checking email and username if they exist
            const checkEmail = await usersRepo.checkEmail(email)
            if(checkEmail) return res.status(400).json({eng: "The email is already being used. Please choose a different email.",  kor: '이메일은 이미 사용 중입니다. 다른 이메일을 선택하세요.'})
            const checkUsername = await usersRepo.checkUsername(username)
            if(checkUsername) return res.status(400).json({eng: 'The username already exists. Please choose a different username.', kor: '선택한 유저네임이 이미 존재합니다. 다른 유저네임이을 선택해주세요.'})
        
            // Check password
            const checkPassword = await usersRepo.validatePassword(password)
            if(!checkPassword) return res.status(400).json({eng: "Password must contain one of each of the following: uppercase letter, lowercase letter, number, special character.", kor: "비밀번호는 대문자, 소문자, 숫자, 특수문자 중 하나식 포함해야 합니다."})
            if(password !== repeatPassword) return res.status(400).json({eng: "Your passwords must be matching.", kor: "비밀번호가 일치해야 합니다."})

            return res.status(200).send({success: true});
            
        } catch (err) {
            res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
        }


  }
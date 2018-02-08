import { Injectable } from '@angular/core';


@Injectable()
export class ValidateService {

  constructor() { }

  validateFeedback(feedback)  {
    if (feedback.email == null
      || feedback.rate == null
) {
      return false;
    } else {
      return true;
    }
  }


  validateTeamName(name)  {
    if (name == null || name.lenght > 30) {
      return false;
    } else {
      return true;
    }
  }

  validateCaptainName(name)  {
    if (name == null || name.lenght > 30) {
      return false;
    } else {
      return true;
    }
  }

  validateTeamContact(email)  {
    if (email == null || email == "undefined")  {
      return false;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validateSignUp(sign)  {
    if (sign.teamName == null || sign.teamCaptain == null
      || sign.teamContact == null) {
      return false;
    } else {
      return true;
    }
  }

  validateRegisterCompany(company)  {
    if (company.name == null || company.email == null
        || company.description == null || company.location == null
        || company.contact == null || company.password == null
        || company.confirmPassword == null) {
    return false;
    } else {
      return true;
    }
  }

  validateRegisterPartner(partner)  {
    if (partner.name == null || partner.email == null
      || partner.description == null || partner.location == null
      || partner.contact == null || partner.password == null
      || partner.website == null
      || partner.confirmedPassword == null) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(item) {
    return item;
  }

  validateFieldsProposal(proposal) {
    if (proposal.company == null || proposal.description == null
      || proposal.requirements == null || proposal.date_beginning == null
      || proposal.date_end == null || proposal.salary == null
      || proposal.observations == null || proposal.vacancies == null
      || proposal.link == null) {
      return false;
    } else {
      return true;
    }
  }

  //Temporary solution
  validateDates(proposal) {
    const initialDate: Date = new Date(proposal.date_beginning);
    const finalDate: Date = new Date(proposal.date_end);
    console.log(finalDate);

    return this.isDate(initialDate) && this.isDate(finalDate);
  }

  isDate(date)  {
    return (date instanceof Date && !isNaN(date.valueOf()));
  }

  validateApplication(application) {
    return !(application.curriculumVitae == null || application.motivationLetter == null);
  }

  samePasswords(password, confirmPassoword)  {
    return password === confirmPassoword;
  }
}
